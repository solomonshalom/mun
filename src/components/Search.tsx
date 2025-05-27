"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, titleCase } from "@/lib/utils";
import Fuse from "fuse.js";
import {
  Bot,
  Brain,
  Briefcase,
  Code,
  DollarSign,
  Gamepad2,
  GraduationCap,
  Laptop,
  Music as MusicIcon,
  Palette,
  Pen,
  Plane,
  Search as SearchIcon,
  Shuffle,
  Users,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

// Import graphData from the public directory
import graphData from "../../public/fixedGraphData.json";
import { SocraticaLogo } from "./icons/SocraticaLogo";

// Define interfaces for the data structure
interface NodeData {
  name: string;
  major: string;
  response: string;
  topMatch: string;
  summarizedResponse: string;
  categories: string[];
}

interface Node {
  id: string;
  data: NodeData;
}

interface Link {
  source: string;
  target: string;
  value: number;
}

interface GraphLink {
  source: string;
  target: string;
}

interface CustomNode extends Node {
  links: Link[];
  data: NodeData & {
    originalResponse: string;
  };
}

interface GraphDataNode extends Node {
  data: NodeData;
}

// Type definition for graphData
interface GraphDataStructure {
  nodes: GraphDataNode[];
  links: GraphLink[];
}

// Cast imported data to the correct type
const typedGraphData = graphData as unknown as GraphDataStructure;

// Create hashmap of id -> node and attach links to each node
const nodeMap = new Map<string, CustomNode>();
typedGraphData.nodes.forEach((node: GraphDataNode) => {
  nodeMap.set(node.id, {
    ...node,
    data: {
      ...node.data,
      originalResponse: "",
    },
    links: [],
  });
});

typedGraphData.links.forEach((link: GraphLink) => {
  const sourceNode = nodeMap.get(link.source);
  const targetNode = nodeMap.get(link.target);

  if (sourceNode) {
    sourceNode.links.push({ ...link, value: 1 });
  }

  if (targetNode) {
    targetNode.links.push({ ...link, value: 1 });
  }
});

// Generate random pastel colors for each major
const majorColors = new Map<string, string>();
const pastelColors = [
  "bg-pink-100 border-pink-200 text-pink-800",
  "bg-blue-100 border-blue-200 text-blue-800",
  "bg-green-100 border-green-200 text-green-800",
  "bg-purple-100 border-purple-200 text-purple-800",
  "bg-yellow-100 border-yellow-200 text-yellow-800",
  "bg-indigo-100 border-indigo-200 text-indigo-800",
  "bg-red-100 border-red-200 text-red-800",
  "bg-teal-100 border-teal-200 text-teal-800",
  "bg-orange-100 border-orange-200 text-orange-800",
  "bg-cyan-100 border-cyan-200 text-cyan-800",
];

// Assign colors to majors
typedGraphData.nodes.forEach((node: GraphDataNode) => {
  const major = node.data.major === "N/A" ? "Other" : node.data.major;
  if (!majorColors.has(major)) {
    const colorIndex = majorColors.size % pastelColors.length;
    majorColors.set(major, pastelColors[colorIndex]);
  }
});

// Create a map for category colors
const categoryColors = new Map<string, string>();

// Function to get consistent color for a category
const getCategoryColor = (category: string) => {
  if (!categoryColors.has(category)) {
    const colorIndex = categoryColors.size % pastelColors.length;
    categoryColors.set(category, pastelColors[colorIndex]);
  }
  return categoryColors.get(category) || pastelColors[0];
};

export const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<CustomNode[]>([]);
  const [allPeople, setAllPeople] = useState<CustomNode[]>(
    typedGraphData.nodes
      .filter(
        (node: GraphDataNode) =>
          // Include anyone with either summarizedResponse OR response, categories are now optional
          (node.data.summarizedResponse &&
            node.data.summarizedResponse.trim() !== "") ||
          (node.data.response && node.data.response.trim() !== "")
      )
      .map((node: GraphDataNode) => {
        const existingNode = nodeMap.get(node.id);
        // Ensure categories is always an array
        if (!node.data.categories) {
          node.data.categories = ["Uncategorized"];
        } else if (node.data.categories.length === 0) {
          node.data.categories = ["Uncategorized"];
        }

        return {
          ...node,
          data: {
            ...node.data,
            originalResponse: "",
          },
          links: existingNode?.links || [],
        };
      })
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 40 });
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get unique categories from all nodes and sort them by frequency
  const allCategories = useMemo(() => {
    const categoryCount = new Map<string, number>();

    // Count occurrences of each category
    allPeople.forEach((person) => {
      if (person.data.categories && person.data.categories.length > 0) {
        person.data.categories.forEach((category) => {
          categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
        });
      }
    });

    // Convert to array, sort by count, and take top 6
    const sortedCategories = Array.from(categoryCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([category]) => category);

    // Add manual categories if they're not already included
    const manualCategories = ["Cooking", "Music", "Travel", "Robotics"];
    manualCategories.forEach((category) => {
      if (!sortedCategories.includes(category)) {
        sortedCategories.push(category);
      }
    });

    // Make sure we have an Uncategorized category if needed
    if (
      allPeople.some(
        (person) =>
          !person.data.categories || person.data.categories.length === 0
      ) &&
      !sortedCategories.includes("Uncategorized")
    ) {
      sortedCategories.push("Uncategorized");
    }

    return ["All", ...sortedCategories].sort((a, b) => {
      if (a === "All") return -1;
      if (b === "All") return 1;
      return a.localeCompare(b);
    });
  }, [allPeople]);

  // Get icon for a category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "all":
        return <SearchIcon className="h-4 w-4" />;
      case "robotics":
        return <Bot className="h-4 w-4" />;
      case "art":
        return <Palette className="h-4 w-4" />;
      case "ai":
        return <Brain className="h-4 w-4" />;
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      case "finance":
        return <DollarSign className="h-4 w-4" />;
      case "gaming":
        return <Gamepad2 className="h-4 w-4" />;
      case "programming":
        return <Code className="h-4 w-4" />;
      // New icons
      case "cooking":
        return <Utensils className="h-4 w-4" />;
      case "music":
        return <MusicIcon className="h-4 w-4" />;
      case "travel":
        return <Plane className="h-4 w-4" />;
      case "business":
        return <Briefcase className="h-4 w-4" />;
      case "community":
        return <Users className="h-4 w-4" />;
      case "design":
        return <Pen className="h-4 w-4" />;
      case "software":
        return <Laptop className="h-4 w-4" />;
      case "robotics":
        return <Bot className="h-4 w-4" />;
      default:
        return <SearchIcon className="h-4 w-4" />;
    }
  };

  const fuseOptions = useMemo(
    () => ({
      keys: [
        "data.name",
        "data.major",
        "data.summarizedResponse",
        "data.response",
        "data.categories",
        { name: "data.categories", weight: 2 }, // Give more weight to category matches
      ],
      includeScore: true,
      isCaseSensitive: false,
      findAllMatches: true,
      threshold: 0.4,
    }),
    []
  );

  const fuse = useMemo(
    () => new Fuse(allPeople, fuseOptions),
    [allPeople, fuseOptions]
  );

  // Filter people based on selected tag and search term
  const getFilteredPeople = useCallback(() => {
    let filtered = allPeople;

    // Apply search filter
    if (searchTerm.trim() !== "") {
      const searchResults = fuse.search(searchTerm);
      filtered = searchResults.map((result) => ({
        ...result.item,
        data: {
          ...result.item.data,
          originalResponse: "",
        },
        links: result.item.links || [],
      }));
    }

    // Apply tag filter
    if (selectedTag && selectedTag !== "All") {
      if (selectedTag === "Uncategorized") {
        // Special handling for Uncategorized
        filtered = filtered.filter(
          (person) =>
            !person.data.categories ||
            person.data.categories.length === 0 ||
            person.data.categories.includes("Uncategorized")
        );
      } else {
        // Normal category filter
        filtered = filtered.filter((person) =>
          person.data.categories?.some(
            (category) => category.toLowerCase() === selectedTag.toLowerCase()
          )
        );
      }
    }

    return filtered;
  }, [allPeople, searchTerm, selectedTag, fuse]);

  // Get visible people for rendering
  const visiblePeople = useMemo(() => {
    const filtered = getFilteredPeople();
    return filtered.slice(visibleRange.start, visibleRange.end);
  }, [getFilteredPeople, visibleRange]);

  // Handle tag selection
  const handleTagSelect = (tagName: string) => {
    if (tagName === "All" || tagName === selectedTag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tagName);
      // Clear search when selecting a tag
      setSearchTerm("");
    }
    setVisibleRange({ start: 0, end: 40 });
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    // Reset visible range when search changes
    setVisibleRange({ start: 0, end: 40 });
    // Reset selection when search changes
    setSelectedPersonId(null);
    // Don't reset tag selection when searching anymore
  };

  useEffect(() => {
    // Initialize all people on component mount
    setIsLoading(true);

    // Simulate loading for a smoother experience and shuffle on client-side only
    setTimeout(() => {
      setAllPeople((prev) => {
        // Log how many people we have
        console.log(`Loaded ${prev.length} people`);

        return [...prev]
          .map((node) => ({
            ...node,
            links: node.links || [],
          }))
          .sort(() => Math.random() - 0.5);
      }); // Shuffle the array
      setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      // If search is empty, show all people
      setSearchResults([]);
    } else {
      const results = fuse
        .search(debouncedSearchTerm)
        .map((result: { item: GraphDataNode }) => {
          const node = nodeMap.get(result.item.id);
          return {
            ...result.item,
            data: {
              ...result.item.data,
              originalResponse: "",
            },
            links: node?.links || [],
          };
        });
      setSearchResults(results);
    }
  }, [debouncedSearchTerm, fuse]);

  // Handle scroll to load more items
  useEffect(() => {
    const handleScroll = () => {
      if (!gridRef.current) return;

      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      const bottomThreshold = 300; // px from bottom

      if (scrollHeight - scrollTop - clientHeight < bottomThreshold) {
        const displayedPeople =
          searchTerm.trim() === "" ? allPeople : searchResults;
        if (visibleRange.end < displayedPeople.length) {
          setVisibleRange((prev) => ({
            start: prev.start,
            end: Math.min(prev.end + 20, displayedPeople.length),
          }));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleRange, allPeople, searchResults, searchTerm]);

  // Focus search with keyboard shortcut
  useHotkeys("ctrl+k, cmd+k", (e: KeyboardEvent) => {
    e.preventDefault();
    searchInputRef.current?.focus();
  });

  // Navigate through grid with arrow keys
  useHotkeys(
    "down",
    () => {
      const filtered = getFilteredPeople();
      if (filtered.length === 0) return;

      if (selectedPersonId === null) {
        handlePersonSelect(filtered[0].id);
      } else {
        const currentIndex = filtered.findIndex(
          (p) => p.id === selectedPersonId
        );
        const nextIndex = Math.min(currentIndex + 4, filtered.length - 1);
        handlePersonSelect(filtered[nextIndex].id);

        // Ensure the selected item is in view
        ensureInView(nextIndex);
      }
    },
    { preventDefault: true }
  );

  useHotkeys(
    "up",
    () => {
      const filtered = getFilteredPeople();
      if (selectedPersonId === null) return;

      const currentIndex = filtered.findIndex((p) => p.id === selectedPersonId);
      const nextIndex = Math.max(currentIndex - 4, 0);
      handlePersonSelect(filtered[nextIndex].id);

      // Ensure the selected item is in view
      ensureInView(nextIndex);
    },
    { preventDefault: true }
  );

  useHotkeys(
    "right",
    () => {
      const filtered = getFilteredPeople();
      if (filtered.length === 0) return;

      if (selectedPersonId === null) {
        handlePersonSelect(filtered[0].id);
      } else {
        const currentIndex = filtered.findIndex(
          (p) => p.id === selectedPersonId
        );
        const nextIndex = Math.min(currentIndex + 1, filtered.length - 1);
        handlePersonSelect(filtered[nextIndex].id);

        // Ensure the selected item is in view
        ensureInView(nextIndex);
      }
    },
    { preventDefault: true }
  );

  useHotkeys(
    "left",
    () => {
      const filtered = getFilteredPeople();
      if (selectedPersonId === null) return;

      const currentIndex = filtered.findIndex((p) => p.id === selectedPersonId);
      const nextIndex = Math.max(currentIndex - 1, 0);
      handlePersonSelect(filtered[nextIndex].id);

      // Ensure the selected item is in view
      ensureInView(nextIndex);
    },
    { preventDefault: true }
  );

  useHotkeys(
    "enter",
    () => {
      if (selectedPersonId !== null) {
        setIsDialogOpen(true);
      }
    },
    { preventDefault: true }
  );

  useHotkeys(
    "escape",
    () => {
      if (isDialogOpen) {
        setIsDialogOpen(false);
      } else {
        handleDialogClose();
      }
    },
    { preventDefault: true }
  );

  // Ensure selected item is in view
  const ensureInView = (index: number) => {
    if (index < visibleRange.start) {
      setVisibleRange({
        start: Math.max(0, index - 10),
        end: Math.max(40, index + 30),
      });
    } else if (index >= visibleRange.end) {
      setVisibleRange({
        start: Math.max(0, index - 30),
        end: index + 10,
      });
    }
  };

  // Handle person selection
  const handlePersonSelect = useCallback((id: string) => {
    setSelectedPersonId(id);
  }, []);

  // Handle dialog close
  const handleDialogClose = useCallback(() => {
    setSelectedPersonId(null);
  }, []);

  // Get selected person
  const selectedPerson = useMemo(() => {
    if (!selectedPersonId) return null;
    return allPeople.find((person) => person.id === selectedPersonId);
  }, [selectedPersonId, allPeople]);

  // Function to shuffle people
  const shufflePeople = () => {
    setAllPeople((prev) => [...prev].sort(() => Math.random() - 0.5));
    setVisibleRange({ start: 0, end: 40 });
  };

  // Function to truncate long program names
  // const formatMajor = (major: string) => {
  //   if (major.length > 20) {
  //     return major.substring(0, 18) + "...";
  //   }
  //   return major;
  // };

  // // Function to truncate long text
  // const truncateText = (text: string, maxLength: number = 20) => {
  //   if (text.length > maxLength) {
  //     return text.substring(0, maxLength - 2) + "...";
  //   }
  //   return text;
  // };

  // Helper function to get display text (summarizedResponse or fallback to response)
  const getDisplayText = (node: CustomNode | GraphDataNode) => {
    if (
      node.data.summarizedResponse &&
      node.data.summarizedResponse.trim() !== ""
    ) {
      return node.data.summarizedResponse;
    }
    return node.data.response || "";
  };

  return (
    <div className="font-sans max-w-6xl w-full mx-auto">
      <div ref={searchContainerRef}>
        <div className="relative max-w-6xl mx-auto">
          <div className="relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <input
                ref={searchInputRef}
                className="text-lg mt-4 w-full pl-12 py-3 rounded-full border-2 border-zinc-300 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 transition-all bg-white"
                placeholder="Search for people"
                onChange={handleSearch}
                value={searchTerm}
              />
              <div className="absolute left-5 top-1/2 transform -translate-y-1 text-zinc-400">
                <SearchIcon className="h-5 w-5" />
              </div>
            </motion.div>

            {/* Interest Tags */}
            <motion.div
              className="mt-4 pb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            >
              <div className="flex flex-wrap gap-2 md:gap-3">
                {allCategories.map((category, index) => (
                  <motion.button
                    key={category}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
                      selectedTag === category
                        ? "bg-zinc-800 text-zinc-50 border border-zinc-300"
                        : "bg-white text-zinc-700 border border-zinc-200"
                    )}
                    onClick={() => handleTagSelect(category)}
                    whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    layout
                  >
                    <span
                      className={cn(
                        "transition-colors",
                        selectedTag === category
                          ? "text-white"
                          : "text-zinc-500"
                      )}
                    >
                      {getCategoryIcon(category)}
                    </span>
                    <motion.span layout transition={{ duration: 0.3 }}>
                      {category}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-64">
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{
              scale: [0.95, 1.05, 0.95],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <SocraticaLogo className="text-zinc-800 size-5" />
            </motion.div>
            <motion.p
              className="text-zinc-950 ml-2 font-5by7 uppercase tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              People finding...
            </motion.p>
          </motion.div>
          {/* <motion.p
            className="text-zinc-800 text-xl font-conte mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            LOADING
          </motion.p> */}
        </div>
      ) : (
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <div className="flex justify-between items-center mb-4">
            <motion.div
              className="text-sm text-zinc-600 font-medium bg-[#f8f3e3] px-3 py-1 rounded-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {searchTerm.trim() !== "" ? (
                <span>
                  Found {getFilteredPeople().length}{" "}
                  {getFilteredPeople().length === 1 ? "person" : "people"}{" "}
                  matching &ldquo;{searchTerm}&rdquo;
                </span>
              ) : selectedTag ? (
                <span>
                  Showing {getFilteredPeople().length} people interested in{" "}
                  {selectedTag}
                </span>
              ) : (
                <span>
                  Showing {visiblePeople.length} of {getFilteredPeople().length}{" "}
                  people
                </span>
              )}
            </motion.div>

            <motion.button
              className="text-sm flex items-center gap-1 bg-[#f8f3e3] hover:bg-[#f0e9d6] text-zinc-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shufflePeople}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            >
              <Shuffle className="h-3.5 w-3.5" />
              Shuffle
            </motion.button>
          </div>

          {/* People Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence mode="sync">
              {visiblePeople.map((item) => {
                // const isSelected = selectedPersonId === item.id;

                return (
                  <motion.div
                    key={`entry-${item.id}`}
                    className="h-full flex"
                    onClick={() => handlePersonSelect(item.id)}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      transition: { duration: 0.15 },
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                      delay: Math.min(
                        0.05 * (visiblePeople.indexOf(item) % 8),
                        0.2
                      ),
                    }}
                    whileHover={{
                      y: -3,
                      transition: { duration: 0.15, ease: "easeInOut" },
                    }}
                    layout
                  >
                    <div
                      style={{
                        boxShadow:
                          "0px 4px 0px rgba(0, 0, 0, 0.04), 0px 4px 7px rgba(0, 0, 0, 0.08)",
                      }}
                      className={`h-full w-full p-4 rounded-xl border cursor-pointer bg-white transition-all duration-200`}
                    >
                      <div className="flex flex-col h-full">
                        <div>
                          <h3 className="font-tiempos text-lg font-medium text-zinc-900">
                            {titleCase(item.data.name)}
                          </h3>
                        </div>
                        <div className="mt-2 flex-grow">
                          <p className="text-sm text-zinc-600 line-clamp-4">
                            {getDisplayText(item)}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-zinc-100">
                          <div className="flex flex-wrap gap-1.5">
                            {item.data.categories?.map((category, idx) => (
                              <span
                                key={`${item.id}-${category}-${idx}`}
                                className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(
                                  category
                                )}`}
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                          <div className="mt-2 text-xs text-zinc-400">
                            {(() => {
                              // Count unique connections
                              const uniqueConnections = new Set<string>();
                              item.links.forEach((link) => {
                                const connectedNodeId =
                                  link.source === item.id
                                    ? link.target
                                    : link.source;
                                uniqueConnections.add(connectedNodeId);
                              });
                              return uniqueConnections.size;
                            })()}{" "}
                            connections
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Load more indicator */}
          {/* {visibleRange.end < getFilteredPeople().length && (
            <div className="flex justify-center mt-8">
              <motion.button
                className="px-4 py-2 bg-[#f8f3e3] hover:bg-[#f0e9d6] text-zinc-700 rounded-full text-sm font-medium"
                onClick={() =>
                  setVisibleRange((prev) => ({
                    start: prev.start,
                    end: Math.min(prev.end + 20, getFilteredPeople().length),
                  }))
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                Load more
              </motion.button>
            </div>
          )} */}
        </motion.div>
      )}

      {/* Separate Dialog component */}
      <Dialog
        open={selectedPerson !== null}
        onOpenChange={(open) => {
          if (!open) handleDialogClose();
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          {selectedPerson &&
            (() => {
              const node = nodeMap.get(selectedPerson.id);

              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="font-tiempos text-2xl">
                      {titleCase(selectedPerson.data.name)}
                    </DialogTitle>
                    {/* <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${majorColor} inline-block`}
                      >
                        {major}
                      </span>
                    </div> */}
                  </DialogHeader>

                  <div className="mt-0">
                    <h3 className="text-sm font-medium text-zinc-500 mb-1">
                      Response:
                    </h3>
                    <p className="text-zinc-700">
                      {getDisplayText(selectedPerson)}
                    </p>
                    {selectedPerson.data.categories?.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-sm font-medium text-zinc-500 mb-2">
                          Categories:
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedPerson.data.categories.map(
                            (category, idx) => (
                              <span
                                key={`dialog-${selectedPerson.id}-${category}-${idx}`}
                                className={`text-sm px-3 py-1 rounded-full ${getCategoryColor(
                                  category
                                )}`}
                              >
                                {category}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {node &&
                    node.links.length > 0 &&
                    (() => {
                      // Create a Set to track unique connected node IDs
                      const uniqueConnections = new Set<string>();
                      const uniqueLinks = node.links.filter((link) => {
                        const connectedNodeId =
                          link.source === selectedPerson.id
                            ? link.target
                            : link.source;
                        if (uniqueConnections.has(connectedNodeId)) {
                          return false;
                        }
                        uniqueConnections.add(connectedNodeId);
                        return true;
                      });

                      return (
                        <div className="mt-6">
                          <h3 className="text-sm font-medium text-zinc-500 mb-3">
                            All Connections ({uniqueConnections.size}):
                          </h3>
                          <div className="max-h-[300px] overflow-y-auto pr-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {uniqueLinks.map((link, linkIndex) => {
                                const connectedNodeId =
                                  link.source === selectedPerson.id
                                    ? link.target
                                    : link.source;
                                const connectedNode =
                                  nodeMap.get(connectedNodeId);

                                if (!connectedNode) return null;

                                return (
                                  <motion.div
                                    key={`connection-${connectedNode.id}-${selectedPerson.id}-${linkIndex}`}
                                    className="p-3 bg-opacity-30 rounded-lg border border-zinc-200 hover:border-zinc-300 cursor-pointer transition-all"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: 0.1 + Math.min(linkIndex, 5) * 0.1,
                                      ease: "easeOut",
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handlePersonSelect(connectedNodeId);
                                    }}
                                  >
                                    <div className="flex flex-col">
                                      <h4 className="font-medium text-zinc-900">
                                        {connectedNode.data.name}
                                      </h4>
                                      {/* <span
                                        className={`text-xs px-2 py-0.5 rounded-full ${connectedColor} inline-block w-fit mt-1`}
                                      >
                                        {connectedMajor}
                                      </span> */}
                                    </div>
                                    <div className="mt-2">
                                      <p className="text-sm text-zinc-600">
                                        {getDisplayText(connectedNode)}
                                      </p>
                                      {connectedNode.data.categories?.length >
                                        0 && (
                                        <div className="mt-2 flex flex-wrap gap-1.5">
                                          {connectedNode.data.categories.map(
                                            (category, idx) => (
                                              <span
                                                key={`connection-category-${connectedNode.id}-${category}-${idx}`}
                                                className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(
                                                  category
                                                )}`}
                                              >
                                                {category}
                                              </span>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                </>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};
