# Voice guide: how I talk upstream

## Who I am in threads

I am a student contributor learning this codebase. I will test an issue in my own environment and share the exact steps and results. If I cannot reproduce it, I will say that honestly.

## Rules I write by

### Rule: Claim before testing

My first comment says what I plan to investigate and promises a report. I do not say I confirmed the bug before running it.

- Wrong: "I reproduced #60 and will fix it soon."
- Right: "I'll test the `text: None` crash in #60 and report my environment and results here."

### Rule: Show what I ran

When reporting a result, include the input or command and the output that led to my conclusion.

- Wrong: "It is broken on my computer too."
- Right: "I called `check('Knows Python.', [{'text': None}])` and received `TypeError: sequence item 0: expected str instance, NoneType found`."

### Rule: Stay within my evidence

I describe the behavior I observed without claiming that every input or platform behaves the same way.

- Wrong: "The checker always crashes."
- Right: "This call crashed with `text: None`; I have not tested every chunk shape."

### Rule: Let someone repeat it

I give the starting state and steps instead of referring vaguely to a test I ran.

- Wrong: "Just run the tests and you will see."
- Right: "From the repository root, run `python -m pytest tests/unit/test_faithfulness_checker.py -q` and inspect `test_none_context_chunk_text`."

## Things I never post

- A promise to finish a fix by a certain date.
- "Same as above" instead of my own test result.
- A confident reproduction with no relevant output.
- A claim that I ran a command when I have not run it.

## Rules for PR titles and descriptions

- Use a specific title that names the change without exaggerating it.
- Explain the original problem and the behavior this change delivers.
- Describe only changes present in the committed diff.
- Report actual test commands and results. Distinguish passed checks,
  failed checks, blocked checks, and checks not run.
- Disclose material limitations and deviations from the plan.
- Explain how I used AI and what I personally reviewed or verified.
- Avoid claims such as "fully fixed" or "all tests pass" unless the
  recorded evidence supports them.