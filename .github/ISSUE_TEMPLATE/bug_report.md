name: 🐞 Bug Report
description: Signaler un bug ou un comportement inattendu
title: "[BUG] "
labels: ["bug"]
assignees:
  - ton-nom-github

body:
  - type: markdown
    attributes:
      value: |
        Merci de prendre le temps de remplir ce rapport de bug 🙏

  - type: input
    id: contact
    attributes:
      label: Contact
      description: Comment te contacter si besoin ?
      placeholder: email@example.com
    validations:
      required: false

  - type: textarea
    id: description
    attributes:
      label: Description du bug
      description: Explique ce qui s’est passé et ce que tu attendais.
      placeholder: Décris le problème ici...
    validations:
      required: true

  - type: dropdown
    id: environment
    attributes:
      label: Environnement
      description: Où le problème est-il apparu ?
      options:
        - Production
        - Développement
        - Autre

  - type: textarea
    id: logs
    attributes:
      label: Logs ou erreurs
      description: Copie les logs ou erreurs éventuelles.
      render: shell

  - type: checkboxes
    id: terms
    attributes:
      label: Conditions
      description: En soumettant ce bug, tu confirmes :
      options:
        - label: J’ai cherché si le bug n’existait pas déjà
          required: true
