'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import autoAnimate from '@formkit/auto-animate'


export default function ExpandableParagraph({ children: fullText = "", limit = 800, className = '', expandable = true }) {
    const [isOpen, setIsOpen] = useState(false)
    const truncatedText = fullText.slice(0, limit) + '...'
    const parent = useRef(null)

    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <div className={`${className} tr`}>
            <div >
                <p className="mb-2 transition-all">{isOpen ? fullText : truncatedText}</p>
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                    {expandable && <CollapsibleTrigger asChild>
                        <Button variant="link" className="p-0">
                            {isOpen ? 'Read less' : 'Read more'}
                        </Button>
                    </CollapsibleTrigger>}
                </Collapsible>
            </div>
        </div>
    )
}