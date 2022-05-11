package com.example.timelineboard.service;

import com.example.timelineboard.models.Memo;
import com.example.timelineboard.models.MemoRepository;
import com.example.timelineboard.models.MemoRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class MemoService {
    private final MemoRepository memoRepository;

    @Transactional
    public Long update(Long id, MemoRequestDto requestDto) {
        Memo memo = memoRepository.findById(id).orElseThrow(
                () -> new NullPointerException("ID NOT found")
        );
        memo.update(requestDto);
        return id;
    }
}
