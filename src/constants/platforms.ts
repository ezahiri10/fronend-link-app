export const PLATFORMS = [
  { value: "github", label: "GitHub", icon: "/assets/images/icon-github.svg", color: "#1A1A1A" },
  { value: "youtube", label: "YouTube", icon: "/assets/images/icon-youtube.svg", color: "#EE3939" },
  { value: "linkedin", label: "LinkedIn", icon: "/assets/images/icon-linkedin.svg", color: "#2D68FF" },
  { value: "twitter", label: "Twitter", icon: "/assets/images/icon-twitter.svg", color: "#43B7E9" },
  { value: "facebook", label: "Facebook", icon: "/assets/images/icon-facebook.svg", color: "#2442AC" },
  { value: "twitch", label: "Twitch", icon: "/assets/images/icon-twitch.svg", color: "#9146FF" },
  { value: "devto", label: "Dev.to", icon: "/assets/images/icon-devto.svg", color: "#333333" },
  { value: "codewars", label: "Codewars", icon: "/assets/images/icon-codewars.svg", color: "#8A1A50" },
  { value: "codepen", label: "CodePen", icon: "/assets/images/icon-codepen.svg", color: "#000000" },
  { value: "freecodecamp", label: "freeCodeCamp", icon: "/assets/images/icon-freecodecamp.svg", color: "#302267" },
  { value: "gitlab", label: "GitLab", icon: "/assets/images/icon-gitlab.svg", color: "#EB4925" },
  { value: "hashnode", label: "Hashnode", icon: "/assets/images/icon-hashnode.svg", color: "#0330D1" },
  { value: "stackoverflow", label: "Stack Overflow", icon: "/assets/images/icon-stack-overflow.svg", color: "#EC7100" },
  { value: "frontendmentor", label: "Frontend Mentor", icon: "/assets/images/icon-frontend-mentor.svg", color: "#67BECE" },
] as const;

export type Platform = typeof PLATFORMS[number];

export function getPlatformInfo(value: string) {
  return (
    PLATFORMS.find((p) => p.value === value) ?? {
      label: value,
      icon: null,
      color: "#808080",
    }
  );
}
