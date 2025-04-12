"use client";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [url, setUrl] = useState("");
  const [shorturl, setShortUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    e.preventDefault();
    axios.post(`${BACKEND_URL}/api/generate`, { url, shorturl }).then((response) => {
      if (response.status === 200) {
        setGeneratedUrl(true);
        setLoading(false);
        setShortenedUrl(`${BACKEND_URL}/${response.data.Shorturl}`);
        setUrl("");
        setShortUrl("");
      } else if (response.status === 400) {
        setLoading(false);
        alert("Shorturl already exists for this url");
        setGeneratedUrl(false);
        setShortenedUrl("");
        setUrl("");
        setShortUrl("");
      } else {
        setLoading(false);
        alert("Error generating short URL");
      }
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      const isDark = savedTheme === "dark";
      setIsDarkMode(isDark);
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else {
      if (isDarkMode) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode((prev) => !prev);
  };
  return (
    <div>
      <div>
        <CardContainer className="inter-var">
          <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
            <CardItem translateZ="100" className="text-xl font-bold text-neutral-600 dark:text-white">
              Url Shortener
            </CardItem>
            <CardItem as="p" translateZ="80" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Shorten your links and share them with the world. No more long links!
            </CardItem>
            <form className="my-8" onSubmit={handleSubmit}>
              <CardItem translateZ="100" className="w-full mt-4">
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="Url">Enter Url</Label>
                    <Input
                      id="Url"
                      value={url}
                      required
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://www.burogu.vercel.app"
                      type="text"
                    />
                  </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="Url">Enter Shorten Url</Label>
                  <Input
                    id="Url"
                    value={shorturl}
                    required
                    onChange={(e) => setShortUrl(e.target.value)}
                    placeholder="burogu"
                    type="text"
                  />
                </LabelInputContainer>
              </CardItem>
              <button
                className="group/btn relative block cursor-pointer z-50 my-10 h-10 w-full rounded-md bg-gradient-to-br from-gray-700 to-gray-500 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit"
              >
                PRESS ENTER ➡
                <BottomGradient />
              </button>
            </form>
          </CardBody>
        </CardContainer>
      </div>
      <div className="flex flex-col items-center justify-center mt-6">
        {loading && (
          <div className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-black px-4 py-2 rounded-md shadow-sm dark:shadow-white">
            <span className="text-gray-600 dark:text-gray-300">Generating Short URL...</span>
          </div>
        )}
        {generatedUrl && (
          <Link href={shortenedUrl} target="_blank">
            <div className="text-lg font-semibold text-gray-800 dark:text-white bg-gray-100 dark:bg-black px-4 py-2 rounded-md shadow-sm dark:shadow-white">
              <span className="text-gray-600 dark:text-gray-300">Shortened URL:</span>{" "}
              <span className="text-blue-600 dark:text-blue-400 underline">{shortenedUrl}</span>
            </div>
          </Link>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={toggleDarkMode}
          className="absolute top-4 right-4 p-2 rounded font-bold bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
      </div>
      <footer className="mt-10 text-center text-gray-600 dark:text-gray-400">
        Made with ❤️ by{" "}
        <a
          href="https://github.com/Er-luffy-D"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-gray-300"
        >
          Piyush
        </a>
      </footer>
    </div>
  );
}
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};
