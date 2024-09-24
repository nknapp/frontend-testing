

export function eqeqeqTest(value: string) {
    // This is allowed when "eqeqeq" is configured with "smart"
    console.log(value == null)
    // This is wrong:
    // console.log(value == "1")
    console.log(value === "2")
}
