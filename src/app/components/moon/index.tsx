'use client';

import { AppContext } from "@/app/context/app_context"
import { update } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react"

export function MoonComponent() {
    const {
        weather
    } = useContext(AppContext);

    const [action, setAction] = useState<"enter" | "leave" | null>(null);

    useEffect(() => {
        if (weather === "night") return setAction("enter");
        if (action === 'enter') {
            setAction("leave");
        }
    }, [weather]);


    return <img className={`moon preventActions ${action}`} src="/assets/images/moon.webp" />
}

export const Moon = React.memo(MoonComponent);