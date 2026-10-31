# 10 - Type `never`

## Explication simple
Le type **`never`** ("jamais" en anglais) indique qu'une fonction **ne se termine jamais normalement** :
- Soit parce qu'elle **déclenche une erreur** (`throw new Error(...)`) qui stoppe l'exécution.
- Soit parce qu'elle contient une **boucle infinie** (`while (true)`).

### Différence entre `void` et `never` :
- **`void`** : la fonction fait son travail jusqu'au bout et s'arrête normalement (sans retourner de valeur).
- **`never`** : la fonction est interrompue avant la fin (erreur) ou ne s'arrête jamais.
