import { spawn } from "child_process"
import * as path from "path"
import { default as spawnPromise, Stderr } from "../index"

it('Should echo "hello world" with callback', async () => {
  const value = await spawnPromise(spawn("echo", ["hello", "world"]), cb =>
    expect(String(cb)).toBe("hello world\n")
  )
  return expect(value).toBe("hello world\n")
})
  
it('Should error "error" with callback', async () => {
  try {
    const value = await spawnPromise(
      spawn(path.join(__dirname, "error.sh")),
      () => null,
      cb => expect(String(cb)).toBe("error\n")
    )
  } catch (value) {
    expect(value.message).toBe("error\n")
    expect(value.code).toBe(1)
  }
})

it('Should echo "hello world"', async () => {
  const value = await spawnPromise(spawn("echo", ["hello", "world"]))
  return expect(value).toBe("hello world\n")
})

it('Should error "error"', async () => {
  try {
    const value = await spawnPromise(spawn(path.join(__dirname, "error.sh")))
  } catch (value) {
    expect(value.message).toBe("error\n")
    expect(value.code).toBe(1)
  }
})
