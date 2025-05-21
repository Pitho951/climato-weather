'use client';

import _, { cloneDeep } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";


export function Cloud({
    index
}: CloudProps) {
    const [cloudNumber] = useState(Math.floor(Math.random() * (2 - 1) + 1));

    const direction = useRef(index % 2);
    const scale = useRef(2 / (index + 1) * 2);
    const speed = useRef(10 * scale.current);
    const cloudWidth = useRef(200 * scale.current);
    const windowInnerWidth = useRef(window.innerWidth);
    const startAxisX = useRef(Math.floor(_.random(windowInnerWidth.current, 0)))
    const axisX = useRef(direction.current === 0 ? -startAxisX.current : startAxisX.current + cloudWidth.current);
    const cloudRef = useRef<HTMLImageElement | null>(null);

    const isOut = useCallback(() => {
        const cloudElement = cloudRef.current;

        if (cloudElement) {
            const boundRect = cloudElement.getBoundingClientRect();
            return direction.current === 0 ? boundRect.x > window.innerWidth + 20 : boundRect.x < -(boundRect.width + 20);
        }

        return false
    }, []);

    const resetAxisX = useCallback(() => {
        axisX.current = direction.current === 0 ? -startAxisX.current : startAxisX.current + cloudWidth.current
    }, []);

    const getXSpeed = useCallback((delta: number) => {
        return (direction.current === 0 ? speed.current : -speed.current) * delta
    }, [speed]);

    const getRandomTop = useCallback(() => {
        return (index + 1) * _.random(4, 2);
    }, [index]);

    const regenerate = useCallback(() => {
        const cloudElement = cloudRef.current;

        if (cloudElement) {
            resetAxisX();
            const cloudNumber = Math.floor(_.random(2, 1));
            cloudElement.style.backgroundImage = `url(/assets/images/clouds/cloud_${cloudNumber}.webp)`;
            cloudElement.style.top = `${getRandomTop()}em`
            cloudElement.style.left = `${axisX.current}px`
        }

    }, [resetAxisX]);

    useEffect(() => {
        setTimeout(() => {
            const cloudElement = cloudRef.current;

            if (cloudElement) {
                let lastTime = performance.now();

                const animate = (now: number) => {
                    const opacity = Number(cloudElement.style.opacity);

                    if (!opacity) {
                        cloudElement.style.opacity = `${scale.current}`;
                    }

                    const delta = (now - lastTime) / 1000;
                    axisX.current += getXSpeed(delta);

                    cloudRef.current!.style.left = `${axisX.current}px`

                    lastTime = now;
                    requestAnimationFrame(animate)

                    if (isOut()) {
                        regenerate();
                        requestAnimationFrame(animate)
                    }
                }

                requestAnimationFrame(animate);
            }
        }, index * 1000);
    }, [direction, cloudRef, getXSpeed, index, isOut, regenerate]);

    return (
        <div
            ref={cloudRef}
            style={{
                position: 'absolute',
                width: `${cloudWidth.current}px`,
                height: 50,
                top: `${getRandomTop()}rem`,
                left: `0`,
                transform: `scale(${scale}) `,
                pointerEvents: 'none',
                backgroundImage: `url(/assets/images/clouds/cloud_${cloudNumber}.webp)`,
                backgroundSize: 'contain',
                backgroundRepeat: "no-repeat",
                zIndex: 1,
                opacity: 0,
                transition: "opacity 4s"
            }}
        />
    )
}


type CloudProps = {
    index: number
}