import { RecurringSuggestion, RejectRecurringSuggestionRequest } from "@/app/models/recurring-suggestion/recurring-suggestion.model";
import { environment } from "@/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";
import { MOCK_RECURRING_SUGGESTIONS } from "./reccuring-suggestion.mock";
import { ApiRecurringSuggestion } from "./reccuring-suggestion.api";
import { mapRecurringSuggestion, mapRejectRecurringSuggestionRequest } from "./reccuring-suggestion.mapper";

@Injectable({ providedIn: 'root' })
export class RecurringSuggestionsService {
  private readonly apiUrl = environment.apiUrl;
  private readonly useMock = environment.useMock;
  private readonly mockDelay = environment.mockDelay;

  constructor(private readonly http: HttpClient) {}

  getSuggestions(): Observable<RecurringSuggestion[]> {
    if (this.useMock) {
      return of(MOCK_RECURRING_SUGGESTIONS).pipe(delay(this.mockDelay));
    }
    return this.http.get<ApiRecurringSuggestion[]>(`${this.apiUrl}/recurring-suggestions`).pipe(map((data) => data.map(mapRecurringSuggestion)));
  }

  rejectSuggestion(request: RejectRecurringSuggestionRequest): Observable<void> {
    const apiRequest = mapRejectRecurringSuggestionRequest(request)
    if (this.useMock) {
      return of(void 0).pipe(delay(this.mockDelay));
    }
    return this.http.post<void>(`${this.apiUrl}/recurring-suggestions/reject`, apiRequest);
  }
}
