const PASSWORD = 'tanya2530'
const CONFESSION = `Hello Tanya,

I know you don't have much time. IITians have lots of things to manage, so let's begin.

The first time I saw your profile on Instagram, the first word I said was nothing because no words can define your elegance. But when we started talking, I realised that your character is as goated as your beauty. Even while studying at a top institute, you don't have any ego. You are a down-to-earth person.

And in the middle of all these things happening, I started liking you.

About me, just an old-school boy who believes in the one-woman-man concept.

If I don't send this to you, I will regret it for a lifetime.

I want to ask you:

Would you date me?

I will try my 200% to become like Yang Gwan.

Please answer me. I will respect your decision.`

const app = document.getElementById('app')
const params = new URLSearchParams(window.location.search)
const NAME = (params.get('name') || 'TANYA').trim().slice(0, 30) || 'TANYA'
const INSTAGRAM_USERNAME = ''
let typingTimer = null
let stageTimer = null

function heartsMarkup() {
  let markup = '<div class="floating-hearts" aria-hidden="true">'
  for (let i = 0; i < 18; i++) {
    markup += `<span style="left:${(i * 37) % 100}%;animation-delay:${(i * 0.7) % 8}s;animation-duration:${9 + i % 6}s;font-size:${12 + (i % 4) * 5}px">♥</span>`
  }
  return markup + '</div>'
}

function render(html) {
  clearTimeout(stageTimer)
  app.innerHTML = html
}

function lockIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
}

function arrowIcon() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
}

function eyeIcon(open) {
  return open
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
}

function entryScreen() {
  clearInterval(typingTimer)
  render(`<main class="screen entry-screen fade-in">${heartsMarkup()}<section class="entry-card glass-card"><div class="lock-orbit">${lockIcon()}<span class="spark">✦</span></div><p class="eyebrow">A PRIVATE LITTLE MOMENT</p><h1>A LITTLE SURPRISE IS<br>WAITING FOR YOU <span class="heart-text">❤️</span></h1><form id="password-form" novalidate><label for="password">Secret password</label><div class="password-field" id="password-field">${lockIcon()}<input id="password" name="password" type="password" placeholder="Enter the secret phrase" autocomplete="off"><button class="icon-button" id="visibility-button" type="button" aria-label="Show password">${eyeIcon(false)}</button></div><p class="error-message" id="form-message" role="alert"></p><button class="primary-button" type="submit"><span>UNLOCK THE SURPRISE</span>${arrowIcon()}</button></form></section></main>`)

  const form = document.getElementById('password-form')
  const input = document.getElementById('password')
  const field = document.getElementById('password-field')
  const message = document.getElementById('form-message')
  const visibility = document.getElementById('visibility-button')

  visibility.addEventListener('click', () => {
    const showing = input.type === 'password'
    input.type = showing ? 'text' : 'password'
    visibility.setAttribute('aria-label', showing ? 'Hide password' : 'Show password')
    visibility.innerHTML = eyeIcon(showing)
    input.focus()
  })

  input.addEventListener('input', () => {
    field.classList.remove('has-error')
    message.textContent = ''
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if (input.value.trim() === PASSWORD) {
      field.classList.remove('has-error')
      message.className = 'success-message'
      message.textContent = 'Well, you made it! ❤️'
      stageTimer = window.setTimeout(confessionScreen, 900)
    } else {
      field.classList.add('has-error')
      message.className = 'error-message'
      message.textContent = "That doesn't feel quite right. Try again, softly. 💗"
    }
  })
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character])
}

function confessionScreen() {
  clearInterval(typingTimer)
  render(`<main class="screen confession-screen fade-in">${heartsMarkup()}<section class="confession-card glass-card"><p class="eyebrow">JUST FOR YOU</p><h1>WELCOME ${escapeHtml(NAME.toUpperCase())} <span class="heart-text">❤️</span></h1><div class="confession-copy" id="confession-copy" aria-live="polite"></div><div id="continue-wrap"></div></section></main>`)

  const copy = document.getElementById('confession-copy')
  const wrap = document.getElementById('continue-wrap')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let shown = reduceMotion ? CONFESSION.length : 0

  function highlightedText(value) {
    const phrase = 'Would you date me?'
    const index = CONFESSION.indexOf(phrase)
    if (value.length <= index) return escapeHtml(value)
    const visibleEnd = Math.min(value.length, index + phrase.length)
    return escapeHtml(value.slice(0, index)) + '<strong>' + escapeHtml(value.slice(index, visibleEnd)) + '</strong>' + escapeHtml(value.slice(visibleEnd))
  }

  function paint() {
    const complete = shown >= CONFESSION.length
    copy.innerHTML = highlightedText(CONFESSION.slice(0, shown)) + (complete ? '' : '<span class="typing-cursor" aria-hidden="true"></span>')
    if (complete && !wrap.hasChildNodes()) {
      wrap.innerHTML = `<button class="primary-button continue-button" id="continue-button" type="button">CONTINUE ${arrowIcon()}</button>`
      document.getElementById('continue-button').addEventListener('click', questionScreen)
    }
  }

  paint()
  if (!reduceMotion) {
    typingTimer = window.setInterval(() => {
      shown++
      if (shown >= CONFESSION.length) {
        shown = CONFESSION.length
        clearInterval(typingTimer)
      }
      paint()
    }, 28)
  }
}

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#ff4d8d', '#c084fc', '#ffd6e7', '#ffffff']
  for (let i = 0; i < 90; i++) {
    const piece = document.createElement('span')
    piece.className = 'confetti'
    piece.style.left = `${Math.random() * 100}vw`
    piece.style.background = colors[i % colors.length]
    piece.style.setProperty('--duration', `${1.8 + Math.random() * 1.8}s`)
    piece.style.setProperty('--drift', `${-150 + Math.random() * 300}px`)
    document.body.appendChild(piece)
    window.setTimeout(() => piece.remove(), 3800)
  }
}

function questionScreen() {
  clearInterval(typingTimer)
  render(`<main class="screen question-screen fade-in">${heartsMarkup()}<section class="question-card glass-card"><div id="question-content"><div class="small-heart">♥</div><p class="eyebrow">ONE LAST QUESTION</p><h1>SO, WHAT DO YOU SAY? <span class="heart-text">❤️</span></h1><div class="choice-grid"><button class="choice-button yes-button" id="yes-button" type="button"><span>YES</span><span>❤️</span></button><button class="choice-button no-button" id="no-button" type="button"><span>NO</span><span aria-hidden="true">💔</span></button></div></div></section></main>`)

  document.getElementById('yes-button').addEventListener('click', () => showAnswer('yes'))
  document.getElementById('no-button').addEventListener('click', () => showAnswer('no'))
}

function showAnswer(choice) {
  const content = document.getElementById('question-content')
  if (choice === 'yes') {
    launchConfetti()
    const profileUrl = INSTAGRAM_USERNAME ? `https://instagram.com/${encodeURIComponent(INSTAGRAM_USERNAME.replace(/^@/, '').trim())}/` : 'https://instagram.com/'
    content.innerHTML = `<div class="answer-panel"><div class="celebrate-heart">❤️</div><h1>YOU HAVE TO GIVE A MISSED CALL ON INSTAGRAM. ❤️</h1><p>Sometimes one small call says everything.</p><a class="instagram-link" href="${profileUrl}" target="_blank" rel="noreferrer">♡ VISIT INSTAGRAM</a><button class="restart-button" type="button">↻ Start again</button></div>`
  } else {
    content.innerHTML = `<div class="answer-panel"><div class="broken-heart">💔</div><h1>YOU HAVE TO BLOCK ME. 💔</h1><p>Well... at least give me a dramatic goodbye. 😭</p><button class="restart-button" type="button">↻ Start again</button></div>`
  }
  content.querySelector('.restart-button').addEventListener('click', entryScreen)
}

entryScreen()
