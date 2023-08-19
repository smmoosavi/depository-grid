use clap::Parser;
use poem::{
    endpoint::{EmbeddedFileEndpoint, EmbeddedFilesEndpoint},
    listener::TcpListener,
    Route, Server,
};
use rust_embed::RustEmbed;
use pnet::datalink;

#[derive(RustEmbed)]
#[folder = "../build/"]
pub struct Files;

#[derive(Parser, Debug)]
#[command(version)]
pub struct Args {
    #[arg(short, long, default_value = "5000")]
    pub port: u16,
}

#[tokio::main]
async fn main() -> Result<(), std::io::Error> {
    if std::env::var_os("RUST_LOG").is_none() {
        std::env::set_var("RUST_LOG", "poem=debug");
    }
    tracing_subscriber::fmt::init();
    let args = Args::parse();

    let app = Route::new()
        .at("/", EmbeddedFileEndpoint::<Files>::new("index.html"))
        .nest("/", EmbeddedFilesEndpoint::<Files>::new());

    println!("Listening on:");
    for iface in datalink::interfaces() {
        for ip in iface.ips {
            println!("  http://{}:{}", ip.ip(), args.port);
        }
    }
    
    let host = format!("0.0.0.0:{}", args.port);
    Server::new(TcpListener::bind(host))
        .run(app)
        .await
}