export interface ContainerProps {
    children?: any;
    headerTitle?: string;
    headerBackgroundColor?: string;
    backButton?: boolean;
    cart?: boolean;
    backgroundColor?: string;
    otherStyle?: any;
}
export interface HeaderProps {
    title?: string;
    backgroundColor?: string;
    backButton?: boolean;
    cart?: boolean;
}
export interface CardProps {
    children?: any;
    otherStyle?: any;
}
export interface SpecificationProps {
    title: string;
    value: string;
}