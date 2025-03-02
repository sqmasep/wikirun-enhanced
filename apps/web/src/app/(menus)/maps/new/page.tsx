"use client";

import useNewMapForm from "#/features/maps/hooks/useNewMapForm";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { WIKIPEDIA_LANGUAGES } from "@repo/wikipedia/data/languages";
import { Plus } from "lucide-react";

export default function NewMap() {
  const { form, tagsField, roundsField, newMap } = useNewMapForm();

  return (
    <div className="container mx-auto max-w-6xl">
      <Form {...form}>
        <form className="mt-24" onSubmit={form.handleSubmit(newMap)}>
          <div className="flex gap-4">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        {...field}
                        placeholder="Map name..."
                        className="w-full text-5xl font-bold transition-colors placeholder:text-zinc-700 hover:bg-zinc-900 focus:bg-zinc-900 focus:outline-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        className="field-sizing-content min-h-32 w-full resize-none overflow-hidden text-xl placeholder:text-zinc-700 hover:bg-zinc-900 focus:bg-zinc-900 focus:outline-none"
                        placeholder="Description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="basis-2/3 rounded-xl bg-zinc-900/50 p-8">
              <FormField
                control={form.control}
                name="lang"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(WIKIPEDIA_LANGUAGES).map(
                          ([lang, details]) => (
                            <SelectItem value={lang} key={lang}>
                              <div className="flex items-center gap-2">
                                <img
                                  width={32}
                                  src={`https://flagcdn.com/${details.code}.svg`}
                                  className="rounded-sm"
                                />
                                <span className="inline-flex items-center gap-2">
                                  {details.originalName}

                                  <span className="text-xs text-zinc-600">
                                    ({details.englishName})
                                  </span>
                                </span>
                              </div>
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <p className="text-sm">Tags</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {tagsField.fields.map((field, i) => (
                    <div
                      className="rounded-full bg-zinc-900 pr-3"
                      key={field.id}
                    >
                      <input
                        className="px-4 py-1 focus:outline-none"
                        name={field.name}
                      />
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => tagsField.remove(i)}
                        >
                          x
                        </button>
                      )}
                    </div>
                  ))}
                  <Button
                    color="secondary"
                    type="button"
                    onClick={() => tagsField.append({ name: "" })}
                  >
                    <Plus />
                    Add Tag
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Button className="mt-4 w-full" type="submit">
              Create Map
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
