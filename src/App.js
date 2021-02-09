import React from 'react'
import JsonP from 'fetch-jsonp'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.url = 'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest&max=30'
    this.state = {
      url:
        'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest&max=30&keyword=ポテチ',
      data: [{ image: null }]
    }
  }

  componentDidMount () {
    this.getData()
  }

  async getData () {
    const data = await JsonP(this.state.url)
      .then(res => res.json())
      .then(res => res.item)
    try {
      console.log(data.item)
      this.setState({ data: data })
    } catch {
      alert('検索結果が見つかりませんでした。')
    }
  }

  render () {
    return (
      <>
        <SearchTextInput onChange={this.handleText.bind(this)} />
        <SearchSubmit onClick={this.handleSubmit.bind(this)} />
        <h1>{this.state.url}</h1>
        <ViewImages data={this.state.data} />
      </>
    )
  }

  handleText (event) {
    const key = '&keyword=' + event.target.value
    this.setState({ url: this.url + key })
  }

  handleSubmit () {
    const key = '&keyword=' + this.state.keyword
    this.componentDidMount()
  }
}

const SearchTextInput = props => {
  return <input type='text' onChange={props.onChange} />
}

const SearchSubmit = props => {
  return <button onClick={props.onClick}>検索</button>
}

const ViewImages = props => {
  return (
    <>
      {props.data.map((v, i) => (
        <img src={v.image} />
      ))}
    </>
  )
}

export default App
