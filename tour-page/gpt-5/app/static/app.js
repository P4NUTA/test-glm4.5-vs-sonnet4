const i18n = {
  ru: {
    title: 'Планировщик тура 55+ — Ленинградская область',
    lblDays: 'Длительность (дней)',
    lblBudget: 'Бюджет',
    lblMobility: 'Доступность',
    lblSeed: 'Seed',
    btnGenerate: 'Сгенерировать',
    budgetEconomy: 'Эконом', budgetStandard: 'Стандарт', budgetComfort: 'Комфорт',
    mobilityStrict: 'Мало лестниц', mobilityNormal: 'Обычная',
    footnote: 'Локальные данные. Без внешних API.',
    day: 'День', travel: 'Переезд', visit: 'Посещение', lunch: 'Обед',
    minutes: 'мин', budgetTitle: 'Бюджет дня', altTitle: 'Альтернативы на дождливую погоду',
    errorGeneric: 'Произошла ошибка. Проверьте параметры и попробуйте снова.',
  },
  en: {
    title: 'Tour Planner 55+ — Leningrad Oblast',
    lblDays: 'Duration (days)',
    lblBudget: 'Budget',
    lblMobility: 'Accessibility',
    lblSeed: 'Seed',
    btnGenerate: 'Generate',
    budgetEconomy: 'Economy', budgetStandard: 'Standard', budgetComfort: 'Comfort',
    mobilityStrict: 'Low stairs', mobilityNormal: 'Normal',
    footnote: 'Local data. No external APIs.',
    day: 'Day', travel: 'Transfer', visit: 'Visit', lunch: 'Lunch',
    minutes: 'min', budgetTitle: 'Day budget', altTitle: 'Rainy-day alternatives',
    errorGeneric: 'Something went wrong. Check inputs and try again.',
  }
}

const $ = (sel) => document.querySelector(sel)
const langSel = $('#lang')

function applyLang() {
  const L = i18n[langSel.value]
  $('#title').textContent = L.title
  $('#lbl-days').textContent = L.lblDays
  $('#lbl-budget').textContent = L.lblBudget
  $('#lbl-mobility').textContent = L.lblMobility
  $('#lbl-seed').textContent = L.lblSeed
  $('#btn-generate').textContent = L.btnGenerate
  $('#footnote').textContent = L.footnote
  // update select labels (budget/mobility) if needed
  const b = $('#budget')
  b.options[0].textContent = L.budgetEconomy
  b.options[1].textContent = L.budgetStandard
  b.options[2].textContent = L.budgetComfort
  const m = $('#mobility')
  m.options[0].textContent = L.mobilityStrict
  m.options[1].textContent = L.mobilityNormal
}

applyLang()
langSel.addEventListener('change', applyLang)

$('#btn-generate').addEventListener('click', async () => {
  const payload = {
    days: Number($('#days').value),
    budget_level: $('#budget').value,
    mobility: $('#mobility').value,
    seed: Number($('#seed').value) || undefined,
    lang: $('#lang').value,
  }
  $('#error').classList.add('hidden')
  $('#result').classList.add('hidden')
  try {
    const res = await fetch('/api/plan', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!res.ok || data.ok === false) throw new Error(data.error || 'error')
    renderResult(data)
  } catch (e) {
    const L = i18n[$('#lang').value]
    $('#error').textContent = L.errorGeneric
    $('#error').classList.remove('hidden')
  }
})

function renderResult(data) {
  const L = i18n[$('#lang').value]
  const root = $('#result')
  root.innerHTML = ''
  data.days.forEach(day => {
    const card = document.createElement('div')
    card.className = 'day'
    const title = document.createElement('h3')
    title.textContent = `${L.day} ${day.day}: ${$('#lang').value === 'ru' ? day.base_city_ru : day.base_city_en}`
    const meta = document.createElement('div')
    meta.className = 'meta'
    meta.textContent = `${L.travel}: ${day.total_travel_minutes} ${L.minutes}`
    const items = document.createElement('div')
    items.className = 'items'

    day.items.forEach(it => {
      const row = document.createElement('div')
      row.className = 'item'
      const left = document.createElement('div')
      const right = document.createElement('div')
      if (it.kind === 'travel') {
        left.textContent = ($('#lang').value === 'ru' ? it.label_ru : it.label_en)
        right.textContent = `${it.minutes} ${L.minutes}`
      } else if (it.kind === 'visit') {
        left.textContent = ($('#lang').value === 'ru' ? it.name_ru : it.name_en)
        right.textContent = `${it.minutes} ${L.minutes} · ${it.cost_rub} ₽`
      } else if (it.kind === 'lunch') {
        left.textContent = ($('#lang').value === 'ru' ? it.label_ru : it.label_en)
        right.textContent = `${it.minutes} ${L.minutes} · ${it.cost_rub} ₽`
      }
      row.appendChild(left); row.appendChild(right)
      items.appendChild(row)
    })

    const budget = document.createElement('div')
    budget.className = 'budget'
    budget.innerHTML = `<strong>${L.budgetTitle}:</strong> ` +
      `аттракционы: ${day.day_budget.attractions_rub} ₽ · ` +
      `питание: ${day.day_budget.meals_rub} ₽ · ` +
      `транспорт: ${day.day_budget.transport_rub} ₽ · ` +
      `итого: ${day.day_budget.total_rub} ₽`

    const alt = document.createElement('div')
    alt.className = 'alt'
    const altTitle = document.createElement('div')
    altTitle.innerHTML = `<strong>${L.altTitle}:</strong>`
    alt.appendChild(altTitle)
    if (day.rainy_alternatives.length === 0) {
      const none = document.createElement('div')
      none.textContent = $('#lang').value === 'ru' ? 'Нет альтернатив' : 'No alternatives'
      alt.appendChild(none)
    } else {
      day.rainy_alternatives.forEach(a => {
        const line = document.createElement('div')
        line.textContent = `${$('#lang').value === 'ru' ? a.name_ru : a.name_en} · ${a.cost_rub} ₽`
        alt.appendChild(line)
      })
    }

    card.appendChild(title)
    card.appendChild(meta)
    card.appendChild(items)
    card.appendChild(budget)
    card.appendChild(alt)
    root.appendChild(card)
  })
  root.classList.remove('hidden')
}

