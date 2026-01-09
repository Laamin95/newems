import re

with open('src/components/examples/SelectExample.vue', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace :options with :items
content = content.replace(':options=', ':items=')

# Replace option-label with item-title and option-value with item-value
content = content.replace('option-label=', 'item-title=')
content = content.replace('option-value=', 'item-value=')

# Replace prepend-icon and append-icon with prepend and append
content = content.replace('prepend-icon=', 'prepend=')
content = content.replace('append-icon=', 'append=')

# Replace #option with #item
content = content.replace('<template #option=', '<template #item=')

# Replace option references in slot scope with item
content = re.sub(r'\{\s*option\s*\}', '{ item }', content)
content = content.replace('{{ option.', '{{ item.')
content = content.replace(':class="[\'w-2 h-2 rounded-full\', option.', ':class="[\'w-2 h-2 rounded-full\', item.')
content = content.replace('option.label }}', 'item.label }}')
content = content.replace('option.flag', 'item.flag')
content = content.replace('option.name', 'item.name')
content = content.replace('option.code', 'item.code')
content = content.replace('option.class', 'item.class')
content = content.replace('option.inStock', 'item.inStock')

# Remove max-selections prop (not supported)
content = re.sub(r'\n\s*:max-selections="[^"]*"\n', '\n', content)

# Remove chips prop (not supported)
content = re.sub(r'\n\s*chips\n', '\n', content)
content = content.replace('chips\n', '')

# Remove grouped, group-label, group-options (not supported)
content = re.sub(r'\n\s*grouped\n', '\n', content)
content = re.sub(r'\n\s*group-label="[^"]*"\n', '\n', content)
content = re.sub(r'\n\s*group-options="[^"]*"\n', '\n', content)

with open('src/components/examples/SelectExample.vue', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed SelectExample.vue")
