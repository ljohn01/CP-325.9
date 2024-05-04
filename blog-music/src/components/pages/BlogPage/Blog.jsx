import './Blog.css'

function Blog() {
    return (
        <main>
            <div className="post">
                <div className="image">
                <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                </div>

                <div className="texts">
                <h2>Learn how to read sheet music in three easy steps</h2>
                <p className="info">
                    <a className="author">Lauren Johnson</a>
                    <time>2024-05-01 10:05</time>
                </p>
                <p className="summary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium illo tenetur, corrupti dolorum eos ipsa nulla fugit, deleniti debitis quia labore sint aspernatur! Similique eligendi nam dignissimos, nulla omnis quo?</p>
                </div>
            </div>
        </main>
    )
}

export default Blog