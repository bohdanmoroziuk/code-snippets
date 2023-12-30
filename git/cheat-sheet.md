# Git CheatSheet

## First-time setup

```bash
git config --global user.name "<full name>"
git config --global user.email <email>
```

## Set a username and email address for a single repository

```bash
git config user.name "<full name>"
git config user.email <email>
```

## Check the configuration settings

```bash
git config --list
```

## Change the most recent commit

```bash
git commit --amend -m 'new commit message'
```

## Undo the last local commit

```bash
git reset --soft HEAD~1     # Use --soft if you want to keep your changes
git reset --hard HEAD~1     # Use --hard if you don't care about keeping the changes you made
```

## Push the changes to the remote branch

```bash
git push -u origin <branch-name>
```

## Merge different people's work together with yours

```bash
git fetch
git merge origin/<branch-name>
```

## Create a new local branch from the remote one

```bash
git checkout --track origin/<remote-branch-name>
```