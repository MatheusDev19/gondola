import { redirect } from "next/navigation";
import Form from "next/form"
export default function Home() {
  // async function submit(formdata: FormData) {
  //   'use server'
  //   const search = formdata.get('search') as string
  //   const params = new URLSearchParams()
  //   params.append('q', search)
  //   redirect(`/consultants?${params.toString()}`)
  // }

  return (
    <div>
      <Form action={"/consultants"}>
        <input placeholder="Search" name="search" />
        <button type="submit">Pesquisar</button>
      </Form>
    </div>
  );
}
