'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function ExpandableParagraph({ children: fullText = "", limit = 800, className = '' }) {
    const [isOpen, setIsOpen] = useState(false)

    const truncatedText = fullText.slice(0, limit) + '...'

    return (
        <div className={`${className} transition-all `}>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <p className="mb-2">
                    {isOpen ? fullText : truncatedText}
                </p>
                <CollapsibleContent>
                    <p className="mb-2">{fullText}</p>
                </CollapsibleContent>
                <CollapsibleTrigger asChild>
                    <Button variant="link" className="p-0">
                        {isOpen ? 'Read less' : 'Read more'}
                    </Button>
                </CollapsibleTrigger>
            </Collapsible>
        </div>
    )
}