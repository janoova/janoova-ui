import Page from "@/sanity/schemaTypes/documents/Page";
import Post from "@/sanity/schemaTypes/documents/Post";
import PostCategory from "@/sanity/schemaTypes/documents/PostCategory";
import pageBuilderBlocks from "./blocks";
import Form from "@/sanity/schemaTypes/documents/Form";
import Navigation from "./documents/Navigation";
import SiteSettings from "./documents/SiteSettings";

const documents = [Page, Post, PostCategory, Form, Navigation, SiteSettings];
const blocks = [...pageBuilderBlocks];

const schemaTypes = [...documents, ...blocks];

export default schemaTypes;
