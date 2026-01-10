import HeroError01 from "@/components/blocks/misc/HeroError01";

export default function NotFound() {
  return (
    <>
      <title>Error 404 - Page not found</title>
      <HeroError01
        heading={`<span className="u__text-branding-primary">404.</span> Not Found.`}
      />
    </>
  );
}
