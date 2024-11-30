"use client"
import React, { useState, useEffect, useRef } from 'react'
import { MoveHorizontal } from 'lucide-react';

type ImageSliderProps = {
    image1: string
    image2: string
    width: string
    height: string
}
const ImageSlider: React.FC<ImageSliderProps> = ({
    image1,
    image2,
    width,
    height
}) => {
    const dimension = {
        width,
        height
    };

    const [canStart, setCanStart] = useState<boolean>(false);
    const overlayRef = useRef<HTMLDivElement | null>(null);
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);

    const slideStart = () => {
        setCanStart(true);
    };

    const slideStop = () => {
        setCanStart(false);
    }

    const slideMove = (e:MouseEvent| TouchEvent) => {
        if (!canStart) return;
        if (!overlayRef.current || !sliderRef.current || !inputRef.current) return;
        let pos = getCursorPosition(e);

        const w = inputRef?.current.getBoundingClientRect()?.width;
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;

        slide(pos);
    }

    const slide = (x:number) => {
        if (overlayRef.current && sliderRef.current) {
            overlayRef.current.style.width = `${x}px`;
            sliderRef.current.style.left = `${x}px`;
        }
    }

    const getCursorPosition = (e: MouseEvent | TouchEvent): number => {
        if (!inputRef.current) return 0;
        const rect = inputRef?.current.getBoundingClientRect();
        if (!rect) return 0;
        let x: number;

        // Check if the event is a MouseEvent
        if (e instanceof MouseEvent) {
            x = e.clientX - rect.left;
        }
        // Otherwise, assume it's a TouchEvent
        else if (e instanceof TouchEvent) {
            // Use the first touch point for the calculation
            x = e.touches[0].clientX - rect.left;
        } else {
            return 0; // Default to 0 if the event type isn't recognized
        }

        x = x - window.scrollX;
        return x;
    }

    useEffect(() => {
        window.addEventListener('mouseup', slideStop)
        window.addEventListener('touchend', slideStop)
        window.addEventListener('mousemove', slideMove)
        window.addEventListener('touchmove', slideMove)
        return () => {
            window.removeEventListener('mouseup', slideStop)
            window.removeEventListener('touchend', slideStop)
            window.removeEventListener('mousemove', slideMove)
            window.removeEventListener('touchmove', slideMove)
        }
    }, [canStart])


    return (
        <div className='container relative' style={dimension}>
            <div ref={inputRef}>
                <img src={image1} style={dimension} />
            </div>
            <div ref={overlayRef} className='overlay absolute left-0 top-0 w-1/2 overflow-hidden'>
                <img src={image2} style={dimension} />
            </div>
            <div
                ref={sliderRef}
                className='cursor-e-resize flex justify-center rounded-full items-center border border-white w-[40px] h-[40px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                onMouseDown={slideStart}
                onTouchStart={slideStart}
            >
                <MoveHorizontal />
            </div>
        </div>
    )
}

export default ImageSlider