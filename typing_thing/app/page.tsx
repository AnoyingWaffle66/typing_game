import Image from "next/image";
import Button from "@/components/Button"
import Words from "@/components/Words"

export default function Home() {
  const words = [
    "the","be","of","and","a","to",
    "in","he","have","it","that","for","they","I",
    "with","as","not","on","she","at","by","this",
    "we","you","do","but","from","or","which","one",
    "would","all","will","there","say","who","make","when",
    "can","more","if","no","man","out","other"
  ]
  return (
    <div>
      <div className="h-screen flex items-center justify-center mr-10 ml-10">
        <Words words={words}>
          
        </Words>
        </div>
    </div>
  )
}