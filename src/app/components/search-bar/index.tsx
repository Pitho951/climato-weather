'use client';

import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Form from 'react-bootstrap/Form';


function SearchBarComponent({
    onChange,
    onEnter,
    value
}: SearchBarProps) {

    const [changeValue, setChangeValue] = useState("");
    const _debounce = useMemo(() => _.debounce((changeValue: string) => onChange(changeValue), 100), [onChange]);


    const onKeyUp = useCallback((ev: React.KeyboardEvent<HTMLElement>) => {
        if (ev.key === 'Enter') onEnter();
    }, [changeValue, value]);

    useEffect(() => {
        if (changeValue !== value) {
            _debounce(changeValue)
        }
    }, [changeValue]);

    useEffect(() => {
        if (changeValue !== value) {
            setChangeValue(value);
        }
    }, [value]);

    return (
        <Form.Control value={changeValue} onChange={(ev) => setChangeValue(ev.target.value)} onKeyUp={onKeyUp} placeholder='Pesquise por uma cidade' />
    );
}

export const SearchBar = React.memo(SearchBarComponent)

type SearchBarProps = {
    value: string,
    onChange: (value: string) => void;
    onEnter: () => void;
}