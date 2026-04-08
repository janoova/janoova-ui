"use client";
import dynamic from "next/dynamic";

const ModalVariant01Client = dynamic(
  () => import("./client/ModalVariant01Client"),
  { ssr: false }
);

export default function ModalVariant01Loader(props) {
  return <ModalVariant01Client {...props} />;
}
