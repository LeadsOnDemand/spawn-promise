import { ChildProcess } from "child_process"

export type callback = (data: Buffer) => void

export class Stderr extends Error {
  public code: number

  constructor(code: number, message?: string | undefined) {
    super(message)
    this.name = "Stderr"
    this.code = code
  }
}

export default (
  process: ChildProcess,
  onStdout?: callback,
  onStderr?: callback
) => {
  return new Promise<string>((resolve, reject) => {
    let stderr = ""
    let stdout = ""
    process.stdout?.on("data", (data: Buffer) => {
      stdout += data.toString("utf8")
      if (onStdout) {
        onStdout(data)
      }
    })
    process.stderr?.on("data", (data: Buffer) => {
      stderr += data.toString("utf8")
      if (onStderr) {
        onStderr(data)
      }
    })

    process.on("close", code =>
      code === 0 ? resolve(stdout) : reject(new Stderr(code, stderr))
    )

    process.on("error", reject)
  })
}
