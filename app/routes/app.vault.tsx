import ComingSoon from "@/components/comingsoon";
import useMetaTags from "@/lib/meta";
import type { MetaArgs, MetaFunction } from "react-router";

export const meta: MetaFunction<MetaArgs> = () => {
    return useMetaTags({ title: "Vault" });
};

export default function Vault() {
    return <ComingSoon />;
}
