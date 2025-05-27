import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Garden | Socratica Symposium",
  description: "Our Lil Garden",
};

const Page = () => {
  return (
    <iframe
      className="w-full flex-1 border-none"
      src="https://our-lil-garden.vercel.app/"
      title="Our Lil Garden"
    />
  );
};
export default Page;
