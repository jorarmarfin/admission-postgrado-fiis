import {RegistrationForm} from "@/components";
import {Metadata} from "next";
import {academicPeriodService, programService, universityService} from "@/services";
import {isValidUuid} from "@/lib/utils";
import {notFound} from "next/navigation";

export const metadata: Metadata = {
    title: " Formulario de Registro",
    description: "Formulario de registro para admisión",
}

type pageProps = Promise<{slug: string}>;

export default async function Page(props:{params: pageProps}) {
    const {slug} = await props.params;

    // Validar si el slug es un UUID válido
    if (!isValidUuid(slug)) {
        notFound();
    }

    const activePeriod = await academicPeriodService.getActivePeriod();
    const program = await programService.getProgramByUuid(slug);
    const universities = await universityService.getUniversities();

    return <RegistrationForm
        period={activePeriod.name}
        program={program}
        universities={universities}
    />;
}
