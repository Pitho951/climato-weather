import { Placeholder, PlaceholderProps } from "react-bootstrap";

export function Skeleton({
    isLoading,
    children,
    ...props
}: SkeletonProps) {
    return (
        isLoading ?
            <Placeholder as={props?.as ?? 'span'} animation={props?.animation ?? "glow"} >
                <Placeholder {...props} />
            </Placeholder>
            :
            children
    )
}


type SkeletonProps = {
    isLoading: boolean;
    children?: React.ReactNode;
} & PlaceholderProps
