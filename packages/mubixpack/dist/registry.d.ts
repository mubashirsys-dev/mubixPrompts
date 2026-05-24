export interface ComponentRegistryItem {
    id: string;
    name: string;
    tailwind: string;
    css: string;
    components: Record<string, string>;
}
export declare const componentRegistry: Record<string, ComponentRegistryItem>;
