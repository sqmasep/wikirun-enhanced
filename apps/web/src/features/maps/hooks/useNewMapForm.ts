import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFieldArray, useForm } from "react-hook-form";
import { mapSchema } from "@repo/validation/maps";
import { newMap } from "../actions";

export default function useNewMapForm() {
  const form = useForm({
    resolver: valibotResolver(mapSchema),
    defaultValues: {
      lang: "en",
      name: "",
      description: "",
      tags: [{ name: "" }, { name: "" }],
      playCount: 0,
      rounds: [],
    },
  });

  const tagsField = useFieldArray({ control: form.control, name: "tags" });
  const roundsField = useFieldArray({ control: form.control, name: "rounds" });

  return { form, tagsField, roundsField, newMap };
}
