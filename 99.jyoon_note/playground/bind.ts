function a() {
  console.log(this.name);
}

const obj = { name: "zerocho" };
const b = a.bind(obj);
