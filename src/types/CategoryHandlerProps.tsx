import type {Dispatch, SetStateAction} from "react";
import type {CategoryPropsStatus} from "@/types/CategoryPropsStatus.tsx";

export interface CategoryHandlerProps {
    setSelectedCategoryProps: Dispatch<SetStateAction<CategoryPropsStatus>>;
}
