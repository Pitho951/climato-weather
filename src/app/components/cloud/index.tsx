'use client';

import { AppContext } from "@/app/context/app_context";
import { animator } from "chart.js";
import { AnimatePresence, motion } from "framer-motion";
import _, { cloneDeep } from "lodash";
import { useCallback, useContext, useEffect, useMemo, useRef, useState, useTransition } from "react";


export function Cloud({
    index,
    show
}: CloudProps) {
    const {
        city
    } = useContext(AppContext);

    const startTime = useRef<number>(null);
    const direction = useRef(index % 2);
    const scale = useRef(index * 0.1);
    const width = useRef(200 * scale.current);
    const startX = useRef(Math.floor(_.random(window.innerWidth, 0)))
    const axisX = useRef(direction.current === 0 ? -startX.current : startX.current);
    const cloudRef = useRef<HTMLImageElement | null>(null);

    const getCloudNumber = useCallback(() => {
        return _.random(2, 1);
    }, []);

    const isOut = useCallback(() => {
        const cloudElement = cloudRef.current;

        if (cloudElement) {
            const boundRect = cloudElement.getBoundingClientRect();
            return direction.current === 0 ? boundRect.x > window.innerWidth + 20 : boundRect.x < -(boundRect.width + 20);
        }

        return false
    }, []);

    const resetAxisX = useCallback(() => {
        return direction.current === 0 ? -startX.current : startX.current
    }, []);

    const getXSpeed = useCallback(() => {
        return city.weather.wind.speed
    }, [city]);

    const getRandomTop = useCallback(() => {
        return _.random(25, 2);
    }, [index]);

    const regenerate = useCallback(() => {
        const cloudElement = cloudRef.current;

        if (cloudElement) {
            cloudElement.style.top = `${getRandomTop()}em`
            cloudElement.style.left = `${resetAxisX()}px`
        }

    }, [resetAxisX]);

    const motionCloud = useMemo(() => {
        return show &&
            <motion.div
                ref={cloudRef}
                key={`motion`}
                initial={{ opacity: 0 }}
                animate={{ opacity: scale.current }}
                exit={{ opacity: 0 }}
                transition={{ duration: 4 }}
                style={{
                    position: 'absolute',
                    width: `${width.current}px`,
                    height: 50,
                    top: `${getRandomTop()}em`,
                    left: axisX.current,
                    transform: `scale(${scale}) `,
                    pointerEvents: 'none',
                    backgroundImage: `url(/assets/images/clouds/cloud_${getCloudNumber()}.webp)`,
                    backgroundSize: 'contain',
                    backgroundRepeat: "no-repeat",
                    zIndex: 2
                }}
            />
    }, [show])

    useEffect(() => {
        let animationId: number;
        let firstIteration = true;

        const animate = (now: number) => {
            const cloudElement = cloudRef.current;

            if (cloudElement) {
                if (startTime.current === null) {
                    startTime.current = now;
                }

                const delta = (now - startTime.current) / 1000;
                const speed = (getXSpeed() * delta);

                cloudElement.style.left = `${axisX.current + speed}px`;

                animationId = requestAnimationFrame(animate);
                if (firstIteration) firstIteration = false;
            }
        }

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        }
    }, [direction, getXSpeed, show]);

    return (
        <AnimatePresence initial={!show}>
            {motionCloud}
        </AnimatePresence>
    )
}


type CloudProps = {
    index: number;
    show: boolean;
}