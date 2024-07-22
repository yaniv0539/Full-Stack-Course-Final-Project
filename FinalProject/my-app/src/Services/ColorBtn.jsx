export default function ColorBtn(btnName, btnSize, pathname) {
  const urlsArray = pathname.split("/");
  const isExist = urlsArray.find((url) => url === btnName);

  if (isExist) return `m-2 btn btn-${btnSize} btn-warning`;
  return `m-2 btn btn-${btnSize} btn-secondary`;
}
