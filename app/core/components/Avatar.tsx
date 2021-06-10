import React, { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function Avatar(props) {
  //  const user = session?.user;
  const { register, handleSubmit } = useForm()
  const onSubmit = (data: FormData) => {}
  const [avatar, setAvatar] = useState("")

  useEffect(() => {
    // redirect user to login if not authenticated
    console.log("avatar", avatar)
  }, [avatar])

  //  const [imgData, setImgData] = useState(null);
  const onChange = (e) => {
    if (e.target.files[0]) {
      //      setAvatar(e.target.files[0]);
      const data = new FormData()
      //      setAvatar(URL.createObjectURL(e.target.files[0]));
      data.append("avatar", e.target.files[0])
      fetch("/api/avatara", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data, // this converts data Object to FormData
      })
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error(res.statusText)
          }
        })
        .then(async (data) => {
          // refresh session
          console.log("New avatar", data)
          setAvatar(data.url)
        })
        .catch((error) => console.error(error))
    }
  }

  return (
    <div className="bg-gray-200 px-4 py-4 shadow-lg text-center w-48 h-64 mb-4">
      <img className="w-auto mx-auto object-cover object-center min-h-full" src={avatar} alt="" />
      <label className="block -mt-10 cursor-pointer">
        <span className="leading-normal px-4 py-2 bg-gray-500 text-white text-sm rounded-full">
          Сменить фото
        </span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("file")}
            onChange={onChange}
          />
        </form>
      </label>
    </div>
  )
}
