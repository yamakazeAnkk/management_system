<div align="center">

# Management System

[![Go](https://img.shields.io/badge/Go-1.22+-00ADD8?logo=go)](https://go.dev/)
[![Node](https://img.shields.io/badge/Node-20+-339933?logo=node.js)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

<i>Hệ thống quản lý fullstack: Go (Gin) + MongoDB + React/Vite</i>

</div>

---

## Tổng quan
Dự án cung cấp API backend bằng Go (Gin), kết nối MongoDB, kèm frontend React (Vite). Cấu trúc code được tách lớp rõ ràng: handler/middleware, service, repository, model.

## Kiến trúc nhanh
```text
[Web Client (React/Vite)] --HTTP--> [API (Gin Router)]
                                     |
                                     v
                               [Middleware]
                                     |
                                     v
                           [Handler / Controller]
                                     |
                                     v
                              [Service Layer]
                                     |
                                     v
                                 [Repository]
                                     |
                                     v
                                   (MongoDB)
```

## Cấu trúc thư mục chính
```text
project/
├── api/
│   ├── handler/
│   ├── middleware/
│   └── router.go
├── cmd/
│   ├── api/ (entry backend)
│   └── app/ (entry demo)
├── config/
├── internal/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── util/
├── frontend/ (React + Vite)
├── migrations/
├── scripts/
├── test/
├── web/ (tùy chọn)
├── Makefile
├── docker-compose.yml
├── go.mod / go.sum
└── README.md
```

## Yêu cầu hệ thống
- Go 1.22+
- Node 20+ (khuyến nghị 20 LTS)
- MongoDB (Docker hoặc cài local)

## Cài đặt nhanh
```bash
git clone https://github.com/yamakazeAnkk/management_system.git
cd management_system

# Cài Node 20 (macOS Homebrew ví dụ)
brew install node@20
echo 'export PATH="/opt/homebrew/opt/node@20/bin:$PATH"' >> ~/.zshrc && exec zsh

# Cài Go module
go mod tidy

# Cài frontend deps
cd frontend && npm install && cd ..
```

## Chạy Backend (chỉ backend)
```bash
# Foreground
make run-backend
# hoặc
go run cmd/api/main.go

# Dừng (nếu chiếm cổng 8080)
lsof -ti :8080 | xargs kill -9
```

## Chạy toàn bộ (backend + frontend)
```bash
make run
# Backend chạy nền, frontend Vite tại http://localhost:5173
```

## Dịch vụ MongoDB
- Dùng Docker Compose:
```bash
make docker-run    # bật
make docker-down   # tắt
```
- Hoặc cài local (Homebrew):
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

## Endpoints cơ bản
```http
GET /health  -> 200 {"message": "It's healthy"}
```

## Lệnh Make hữu ích
```bash
make all        # build + test
make build      # build backend
make run        # backend + frontend
make run-backend
make test
make itest
make watch      # live reload (yêu cầu air)
make clean
```

## Ảnh minh họa
> Thêm ảnh vào `docs/images/` rồi tham chiếu tại đây

![Kiến trúc tổng quan](docs/images/architecture.png)
![Màn hình chính](docs/images/screenshot-home.png)

## Quy ước phát triển
- Nhánh: `feature/...`, `fix/...`, `chore/...`
- Commit: Conventional Commits (ví dụ: `feat: add user service`)
- PR nhỏ, rõ ràng, kèm mô tả và checklist

## Giấy phép
Phát hành dưới giấy phép MIT – xem tệp [LICENSE](./LICENSE).
