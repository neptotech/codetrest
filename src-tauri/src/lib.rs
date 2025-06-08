// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use std::fs;
use tauri::command;

#[command]
fn save_snippets_to_documents(content: String) -> Result<(), String> {
    let mut path = dirs::document_dir().ok_or("No documents dir")?;
    path.push("Codetrest Snippets.json");
    fs::write(&path, content).map_err(|e| e.to_string())
}

#[command]
fn load_snippets_from_documents() -> Result<String, String> {
    let mut path = dirs::document_dir().ok_or("No documents dir")?;
    path.push("Codetrest Snippets.json");
    fs::read_to_string(&path).map_err(|e| e.to_string())
}

// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            load_snippets_from_documents,
            save_snippets_to_documents
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
