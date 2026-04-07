import Page from "@/sanity/schemaTypes/documents/Page";
import Post from "@/sanity/schemaTypes/documents/Post";
import PostCategory from "@/sanity/schemaTypes/documents/PostCategory";
import pageBuilderBlocks from "./blocks";
import Form from "@/sanity/schemaTypes/documents/Form";
import FormSubmission from "@/sanity/schemaTypes/documents/FormSubmission";
import Navigation from "./documents/Navigation";
import SiteSettings from "./documents/SiteSettings";
import GlobalTestimonials from "./documents/GlobalTestimonials";
import GlobalTeam from "./documents/GlobalTeam";

const documents = [Page, Post, PostCategory, Form, FormSubmission, Navigation, SiteSettings, GlobalTestimonials, GlobalTeam];
const blocks = [...pageBuilderBlocks];

const schemaTypes = [...documents, ...blocks];

export default schemaTypes;
