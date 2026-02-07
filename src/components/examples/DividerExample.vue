<template>
  <div class="p-6 max-w-6xl mx-auto space-y-8">
    <h1 class="text-3xl font-bold ui-text-color mb-6">Divider Component</h1>

    <!-- Basic Dividers -->
    <Card title="Basic Dividers">
      <p class="text-sm text-ui-text-secondary mb-4">
        Simple horizontal dividers to separate content.
      </p>
      <div class="space-y-4">
        <p class="text-sm ui-text-color">Section 1</p>
        <Divider />
        <p class="text-sm ui-text-color">Section 2</p>
        <Divider />
        <p class="text-sm ui-text-color">Section 3</p>
      </div>
    </Card>

    <!-- With Text -->
    <Card title="Dividers with Text">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add text or content to dividers.
      </p>
      <div class="space-y-4">
        <p class="text-sm ui-text-color">Content above</p>
        <Divider text="OR" />
        <p class="text-sm ui-text-color">Content below</p>
      </div>
    </Card>

    <!-- Text Positions -->
    <Card title="Text Positions">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control where text appears on the divider.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Left aligned:</p>
          <Divider text="Left Text" position="left" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Center aligned (default):</p>
          <Divider text="Center Text" position="center" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Right aligned:</p>
          <Divider text="Right Text" position="right" />
        </div>
      </div>
    </Card>

    <!-- Variants -->
    <Card title="Variants">
      <p class="text-sm text-ui-text-secondary mb-4">
        Different visual styles for dividers.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Default:</p>
          <Divider variant="default" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Dashed:</p>
          <Divider variant="dashed" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Dotted:</p>
          <Divider variant="dotted" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Thick:</p>
          <Divider variant="thick" thickness="thick" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Gradient:</p>
          <Divider variant="gradient" />
        </div>
      </div>
    </Card>

    <!-- Thickness -->
    <Card title="Thickness Options">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control the thickness of dividers.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Thin:</p>
          <Divider thickness="thin" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Medium:</p>
          <Divider thickness="medium" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Thick:</p>
          <Divider thickness="thick" />
        </div>
      </div>
    </Card>

    <!-- Spacing -->
    <Card title="Spacing Options">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control vertical spacing around dividers.
      </p>
      <div class="space-y-4">
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="none" />
          <p class="text-sm ui-text-color">No spacing</p>
        </div>
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="xs" />
          <p class="text-sm ui-text-color">Extra small spacing</p>
        </div>
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="sm" />
          <p class="text-sm ui-text-color">Small spacing</p>
        </div>
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="md" />
          <p class="text-sm ui-text-color">Medium spacing (default)</p>
        </div>
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="lg" />
          <p class="text-sm ui-text-color">Large spacing</p>
        </div>
        <div class="bg-color-1 p-4 rounded">
          <p class="text-sm ui-text-color">Content</p>
          <Divider spacing="xl" />
          <p class="text-sm ui-text-color">Extra large spacing</p>
        </div>
      </div>
    </Card>

    <!-- Custom Colors -->
    <Card title="Custom Colors">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use custom colors for dividers.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Primary color:</p>
          <Divider color="var(--color-primary)" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Success color:</p>
          <Divider color="var(--color-success)" thickness="medium" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Error color:</p>
          <Divider color="var(--color-error)" variant="dashed" />
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">Warning color:</p>
          <Divider color="var(--color-warning)" variant="dotted" />
        </div>
      </div>
    </Card>

    <!-- Vertical Dividers -->
    <Card title="Vertical Dividers">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use vertical dividers to separate horizontal content.
      </p>
      <div class="flex items-center gap-4 h-20">
        <div class="text-sm ui-text-color">Item 1</div>
        <Divider orientation="vertical" />
        <div class="text-sm ui-text-color">Item 2</div>
        <Divider orientation="vertical" variant="dashed" />
        <div class="text-sm ui-text-color">Item 3</div>
        <Divider orientation="vertical" thickness="medium" />
        <div class="text-sm ui-text-color">Item 4</div>
      </div>
    </Card>

    <!-- Vertical with Spacing -->
    <Card title="Vertical Dividers with Spacing">
      <p class="text-sm text-ui-text-secondary mb-4">
        Control horizontal spacing for vertical dividers.
      </p>
      <div class="flex items-center h-20">
        <div class="text-sm ui-text-color">Left</div>
        <Divider orientation="vertical" spacing="xs" />
        <div class="text-sm ui-text-color">Center</div>
        <Divider orientation="vertical" spacing="xl" />
        <div class="text-sm ui-text-color">Right</div>
      </div>
    </Card>

    <!-- With Inset -->
    <Card title="Inset Dividers">
      <p class="text-sm text-ui-text-secondary mb-4">
        Add inset spacing to dividers.
      </p>
      <div class="space-y-4">
        <p class="text-sm ui-text-color">Content above</p>
        <Divider :inset="true" />
        <p class="text-sm ui-text-color">Content below</p>
      </div>
    </Card>

    <!-- With Custom Slot Content -->
    <Card title="Custom Slot Content">
      <p class="text-sm text-ui-text-secondary mb-4">
        Use slots to add custom content to dividers.
      </p>
      <div class="space-y-6">
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">With icon:</p>
          <Divider>
            <Icon name="star" type="solid" :size="16" class="text-warning" />
          </Divider>
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">With badge:</p>
          <Divider>
            <span class="px-3 py-1 bg-primary text-white text-xs rounded-full">NEW</span>
          </Divider>
        </div>
        <div>
          <p class="text-xs text-ui-text-secondary mb-2">With custom text:</p>
          <Divider>
            <span class="text-primary font-semibold">⚡ Featured Content ⚡</span>
          </Divider>
        </div>
      </div>
    </Card>

    <!-- Use Cases -->
    <Card title="Common Use Cases">
      <p class="text-sm text-ui-text-secondary mb-4">
        Real-world examples of divider usage.
      </p>
      
      <!-- Login Form Example -->
      <div class="max-w-md mx-auto space-y-4 bg-color-1 p-6 rounded-lg border border-color">
        <h3 class="text-lg font-semibold ui-text-color">Sign In</h3>
        <button class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
          Continue with Email
        </button>
        <Divider text="OR" text-size="xs" />
        <button class="w-full px-4 py-2 border border-color rounded hover:bg-color-2">
          Continue with Google
        </button>
        <button class="w-full px-4 py-2 border border-color rounded hover:bg-color-2">
          Continue with GitHub
        </button>
      </div>
    </Card>

    <!-- In Lists -->
    <Card title="In Lists">
      <p class="text-sm text-ui-text-secondary mb-4">
        Separate list items with dividers.
      </p>
      <div class="bg-color-1 rounded-lg border border-color">
        <div class="p-4">
          <h4 class="font-semibold ui-text-color">Item 1</h4>
          <p class="text-xs text-ui-text-secondary">Description for item 1</p>
        </div>
        <Divider spacing="none" />
        <div class="p-4">
          <h4 class="font-semibold ui-text-color">Item 2</h4>
          <p class="text-xs text-ui-text-secondary">Description for item 2</p>
        </div>
        <Divider spacing="none" />
        <div class="p-4">
          <h4 class="font-semibold ui-text-color">Item 3</h4>
          <p class="text-xs text-ui-text-secondary">Description for item 3</p>
        </div>
      </div>
    </Card>

    <!-- API Reference -->
    <Card title="API Reference">
      <div class="overflow-x-auto">
        <table class="min-w-full text-xs border border-color rounded-lg overflow-hidden">
          <thead class="bg-color-1">
            <tr>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Prop</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Type</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Default</th>
              <th class="text-left p-3 font-semibold ui-text-color border-b border-color">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-color bg-color-2">
            <tr>
              <td class="p-3 font-mono text-primary">orientation</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'horizontal'</td>
              <td class="p-3 text-ui-text-secondary">horizontal | vertical</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">variant</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'default'</td>
              <td class="p-3 text-ui-text-secondary">default | dashed | dotted | thick | gradient</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">thickness</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'thin'</td>
              <td class="p-3 text-ui-text-secondary">thin | medium | thick</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">spacing</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'md'</td>
              <td class="p-3 text-ui-text-secondary">none | xs | sm | md | lg | xl</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">position</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'center'</td>
              <td class="p-3 text-ui-text-secondary">left | center | right</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">text</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Text content</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">textSize</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">'sm'</td>
              <td class="p-3 text-ui-text-secondary">xs | sm | base | lg</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">color</td>
              <td class="p-3 text-ui-text-secondary">String</td>
              <td class="p-3 text-ui-text-secondary">''</td>
              <td class="p-3 text-ui-text-secondary">Custom color (CSS value)</td>
            </tr>
            <tr>
              <td class="p-3 font-mono text-primary">inset</td>
              <td class="p-3 text-ui-text-secondary">Boolean</td>
              <td class="p-3 text-ui-text-secondary">false</td>
              <td class="p-3 text-ui-text-secondary">Add inset spacing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Slots -->
      <div class="mt-6">
        <h3 class="font-semibold text-sm mb-3 ui-text-color">Slots:</h3>
        <div class="space-y-2 text-sm">
          <div class="p-3 bg-color-1 rounded border border-color">
            <code class="font-mono text-primary">#default</code>
            <p class="text-xs text-ui-text-secondary mt-1">Custom content (replaces text prop)</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { Divider } from '../../'
</script>