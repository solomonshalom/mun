import csv
import json


def process_csv(file_path):
    result = []
    
    with open(file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        for row in csv_reader:
            # Get the title from "Name: Tagline" column
            title = row.get("Name: Tagline", "")
            
            # Get the description
            description = row.get("1-2 sentence description of your project", "")
            
            # Process members - split by comma and capitalize each name
            members_raw = row.get("Name(s) of all members of your group", "")

            link_text = row.get("Any links you wanna share with others about the project or you? (websites, links, personal social handles, etc.)")
            members = []
            
            for name in members_raw.split(','):
                name = name.strip()
                if name:
                    # Capitalize each part of the name
                    capitalized_name = ' '.join(
                        part.capitalize() for part in name.split()
                    )
                    members.append(capitalized_name)
            
            result.append({
                "title": title,
                "description": description,
                "members": members,
                "link_text": link_text
            })
    
    return result

# Process the CSV file
data = process_csv("booths.csv")

# Save the result to a JSON file
with open("boothData.json", "w", encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2)

print(f"Processed {len(data)} records and saved to boothData.json")