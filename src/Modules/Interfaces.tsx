
export interface userData {
    completed: boolean,
    id: number,
    title: string,
    userId: number
}

export interface listProps {
    term: string;
    handleClick: (arg: number) => void;
}
