import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiLaravel,
  SiPostgresql,
  SiDocker,
  SiSqlite,
  SiMongodb,
  SiRedis,
  SiPhp,
  SiWordpress,
  SiWoocommerce,
} from "react-icons/si";
import { FaAws, FaPowerOff } from "react-icons/fa";
import { TbBrandReactNative, TbCloudDataConnection } from "react-icons/tb";
import { FaGitAlt } from "react-icons/fa";
import { Terminal, Layout, Server, Smartphone, Search, ShoppingCart, Globe, Map } from "lucide-react";
import { ElementType } from "react";

export interface Project {
  id: string;
  link: string | null;
  icon: ElementType;
  image: string | null;
}

export const PROJECTS_DATA: Project[]= [
  {
    id: "correamoveis",
    link: "https://correamoveis.com",
    icon: ShoppingCart,
    image: "/projects/correamoveis.png",
  },
  {
    id: "fibron",
    link: "https://fibron.com.br",
    icon: Globe,
    image: "/projects/fibron.png",
  },
  {
    id: "versamaps",
    link: null,
    icon: Map,
    image: null,
  },
  {
    id: "morarlegal",
    link: null,
    icon: Smartphone,
    image: null,
  },
];

export const TAG_CONFIG: Record<string, { icon: ElementType; color: string }> = {
  React: { icon: SiReact, color: "#61DAFB" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  Laravel: { icon: SiLaravel, color: "#FF2D20" },
  "Laravel API": { icon: SiLaravel, color: "#FF2D20" },
  PHP: { icon: SiPhp, color: "#777BB4" },
  WordPress: { icon: SiWordpress, color: "#21759B" },
  WooCommerce: { icon: SiWoocommerce, color: "#96588A" },
  PostGIS: { icon: SiPostgresql, color: "#336791" },
  SEO: { icon: Search, color: "#F97316" },
};

export const SKILLS_CONFIG = {
  web: {
    icon: Layout,
    items: [
      { id: "react", Icon: SiReact, brand: "#06B6D4" },
      { id: "nextjs", Icon: SiNextdotjs, brand: "#A855F7" },
      { id: "typescript", Icon: SiTypescript, brand: "#3178C6" },
      { id: "tailwind", Icon: SiTailwindcss, brand: "#06B6D4" },
    ],
  },
  mobile: {
    icon: Smartphone,
    items: [
      { id: "reactnative", Icon: TbBrandReactNative, brand: "#61DAFB" },
      { id: "offline", Icon: FaPowerOff, brand: "#FA3D20" },
      { id: "sqlite", Icon: SiSqlite, brand: "#003B57" },
      { id: "sync", Icon: TbCloudDataConnection, brand: "#A855F7" },
    ],
  },
  backend: {
    icon: Server,
    items: [
      { id: "nodejs", Icon: SiNodedotjs, brand: "#339933" },
      { id: "laravel", Icon: SiLaravel, brand: "#FF2D20" },
      { id: "postgres", Icon: SiPostgresql, brand: "#4169E1" },
      { id: "mongodb", Icon: SiMongodb, brand: "#339933" },
    ],
  },
  devops: {
    icon: Terminal,
    items: [
      { id: "docker", Icon: SiDocker, brand: "#2496ED" },
      { id: "aws", Icon: FaAws, brand: "#FF9900" },
      { id: "redisrabbitmq", Icon: SiRedis, brand: "#F05032" },
      { id: "git", Icon: FaGitAlt, brand: "#F05032" },
    ],
  },
};