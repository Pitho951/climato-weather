'use client';

import { AppContext } from "@/app/context/app_context"
import React, { useContext, useEffect, useRef, useState } from "react"

export function SunComponent() {
    const {
        weather
    } = useContext(AppContext);

    const [action, setAction] = useState<"enter" | "leave" | null>(null);

    useEffect(() => {
        if (weather === "day") return setAction("enter");
        if (action === 'enter') {
            setAction("leave");
        }
    }, [weather]);

    return <img className={`sun preventActions ${action} `} src="/assets/images/sun.webp" />
}

export const Sun = React.memo(SunComponent);