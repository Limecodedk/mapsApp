import supabase from "./Supabase-client";
import Compressor from "compressorjs";


export const fetchLocation = async (db) => {
  const { data: mloc } = await supabase
    .from(db)
    .select('*')
    .order('location', true);
  return mloc;
};

export const uploadFile = async (path, to_storage) => {

  const response = await fetch(path);
  const blob = await response.blob();

  const time = new Date().getTime();
  const fileName = `${"myimage"} -${time}.jpg`;

  new Compressor(blob, {
    quality: 0.5,
    convertTypes: ['image/jpeg', 'image/png'],
    convertSize: 10000,
    success: (compressedResult) => {
      console.log(compressedResult)
      myUpload(to_storage, fileName, compressedResult);
    },
  });
  return fileName;
}

export const myUpload = async (ts, fn, bl) => {

  const { data, error } = await supabase.storage
    .from(ts)
    .upload(`${fn}`, bl, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    alert(error?.message);
  } else {
    document.querySelector("#myFormContainer").style.display = "grid";
    document.querySelector("#saved").style.display = "block"
  }
};