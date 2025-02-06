import Image from "next/image";
import Button from "@/components/Button"
import Words from "@/components/Words"

export default function Home() {
  const words = ['friday', 'saturday']
  return (
    <div>
      <div>
        <p>
          Josh Epic Page Yuh Yuh Yuh
        </p>
        <Words words={words}>
          
        </Words>
        </div>
    </div>
  )
}