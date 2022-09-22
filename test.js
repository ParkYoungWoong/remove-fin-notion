let i = 0

function hello() {
  console.log('Hello!!!')
  i += 1
  if (i < 10) {
    hello()
  }
}

hello()
