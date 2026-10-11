# Afterword â€” Regency Room MVP v0.6

**Scope:** a testable, mobile-first, chapter-safe discussion room for Jane Austenâ€™s public-domain *Pride and Prejudice* (chapters 1â€“3). The user chooses a chapter, meets Eleanor, Max and Sophie, then types or speaks to them. No copyrighted modern-book uploads are used. The pilot deliberately supports one book, rather than claiming to support all books reliably.

## Built and tested

- Original illustrated Regency room and expressive, blinking/talking SVG avatars with book-chapter-themed lighting, scenery and gentle optional generated ambience.
- Three distinct club members. Tapping a member targets them first. Group replies (usually two characters) respond to each other and the reader.
- **Live AI API**: a server-only Vercel AI Gateway integration, with output validation, chapter-specific constraints, access limiting per server instance, request caps and graceful error fallback. No credentials shipped in browser code.
- **Voices**: built-in browser speech for testers; server-side optional ElevenLabs time-aligned speech with lip-animation timing when credentials and voice IDs are configured. Live voice is turn-based, not a full-duplex call.
- Voice dictation through supported browsers; typed entry available everywhere.
- Guest storage on current browser, exportable as JSON and erasable via UI; no cloud accounts or shared user data. This makes an immediate, testable guest MVP without using FixMyTrip/Shelf databases.
- Installable PWA a¶»§q«^