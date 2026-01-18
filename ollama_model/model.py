import ollama

model = 'gemma3:1b'

messages = [
    {'role': 'system', 'content' : 'You are a helpful assistant.'},
    {'role': 'user', 'content' : 'what is the capital of france'},
]

response = ollama.chat(model=model, messages=messages)

print(response['message']['content'])